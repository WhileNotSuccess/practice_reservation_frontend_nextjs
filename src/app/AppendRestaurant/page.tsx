'use client';

import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AWS from "aws-sdk";

// CKEditor에서 사용할 이미지 업로드 어댑터 클래스
class MyUploadAdapter {
  loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  async upload(): Promise<{ default: string }> {
    try {
      const file = await this.loader.file;
      const data = new FormData();
      data.append("image", file);

      const res = await fetch("http://localhost:3000/s3/image-upload", {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: data
      });

      const result = await res.json();

      return { default: result.url };
    } catch (error) {
      throw error;
    }
  }
}

const UploadEditor: React.FC = () => {
  const [storeName, setStoreName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        region: process.env.AWS_DEFAULT_REGION!,
      });

      const params = {
        Bucket: process.env.AWS_BUCKET!,
        Key: `uploads/${file.name}`,
        Body: file,
        ContentType: file.type,
        ACL: "public-read",
      };

      try {
        const { Location } = await s3.upload(params).promise();
        setImageUrl(Location);
        alert("이미지 업로드 성공!");
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        alert("업로드 중 오류가 발생했습니다.");
      }
    }
  };

  const adapter = (editorInstance: any) => {
    editorInstance.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
      return new MyUploadAdapter(loader);
    };
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col gap-6">
      <div>
        <label className="block mb-2 text-gray-700">식당 이름</label>
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="식당 이름"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div>
        <label className="block mb-2 text-gray-700">메인 이미지 선택</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block mb-2"
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="업로드된 이미지"
            className="w-full h-48 object-cover rounded-md mt-4"
          />
        )}
      </div>
      <div>
        <label className="block mb-2 text-gray-700">내용 작성</label>
        <CKEditor
          editor={ClassicEditor}
          config={{
            licenseKey: 'GPL',
            placeholder: "내용을 입력하세요...",
          }}
          onReady={(editorInstance) => {
            adapter(editorInstance);
          }}
          onChange={(event: any, editorInstance: any) => {
            setContent(editorInstance.getData());
          }}
        />
      </div>
    </div>
  );
};

export default UploadEditor;
