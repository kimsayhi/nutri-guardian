"use client";
import Modal from "@/components/shared/Modal";
import useModal from "@/hooks/useModal";
import { searchSchoolByName } from "@/lib/api/school";
import { SchoolInfoData } from "@/types/api/school";
import { useState } from "react";

export default function FetchTest() {
  const [result, setResult] = useState<SchoolInfoData[]>([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = async () => {
    const result = await searchSchoolByName(input);
    setResult(result);
  };

  const { isOpen, open, close } = useModal();

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center bg-white py-20">
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={handleSearch}>검색</button>
        <div>
          {result.map((item) => (
            <div key={item.SD_SCHUL_CODE}>{JSON.stringify(item)}</div>
          ))}
        </div>
        <button onClick={open}>모달열기</button>
        <Modal isOpen={isOpen} onClose={close} closeOnOverlayClick={false} title="모달테스트">
          안녕
        </Modal>
      </div>
    </>
  );
}
