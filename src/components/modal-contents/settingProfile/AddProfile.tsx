import useSchoolSearch from "@/hooks/useSchoolSearch";
import Spinner from "../../shared/Spinner";
import { useState } from "react";
import { formatSchoolList } from "@/utils/schoolFormat";
import { FormattedSchoolList } from "@/types/school";

interface AddProfileProps {
  onClose: () => void;
}

export default function AddProfile({ onClose }: AddProfileProps) {
  const [schoolSearchValue, setSchoolSearchValue] = useState("");
  const { data: schoolsData } = useSchoolSearch(schoolSearchValue);
  const [selectedSchool, setSelectedSchool] = useState<FormattedSchoolList | null>(null);
  const [isOpenDropDown, setIsOpenDropDown] = useState(true);
  const formattedSchoolList = formatSchoolList(schoolsData);

  const toggleAddProfileMode = () => {
    onClose();
  };
  const handleSchoolSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchoolSearchValue(e.target.value);
    setIsOpenDropDown(true);
  };
  const onClickSchoolName = (school: FormattedSchoolList) => {
    setSelectedSchool(school);
    setSchoolSearchValue(school.schoolName);
    setIsOpenDropDown(false);
  };
  return (
    <div>
      <h2 className="flex flex-col items-center justify-center p-2 font-extrabold">프로필 추가</h2>
      <div className="flex flex-col gap-5 pt-5 pb-50">
        <label htmlFor="profile-name" className="flex flex-col justify-center gap-1 font-semibold">
          이름
          <input
            id="profile-name"
            placeholder="이름을 입력하세요."
            className="rounded-t-lg border-b border-neutral-400 p-2 font-medium outline-0"
          />
        </label>
        <div className="relative">
          <label
            htmlFor="school-name"
            className="relative flex flex-col justify-center gap-1 font-semibold"
          >
            학교
            <input
              onChange={handleSchoolSearchChange}
              onFocus={() => setIsOpenDropDown(true)}
              value={schoolSearchValue}
              id="school-name"
              placeholder="학교명을 입력하세요."
              className="rounded-t-lg border-b border-neutral-400 p-2 font-medium outline-0"
            />
            {
              <div className="absolute right-0 bottom-2">
                <Spinner />
              </div>
            }
          </label>
          {schoolsData.length > 0 && isOpenDropDown && (
            <ul className="absolute top-[69px] left-0 flex w-full flex-col gap-1 rounded-b-lg border-r border-b border-l border-neutral-200 p-3 shadow-md">
              {formattedSchoolList.map((school) => (
                <li className="flex w-full" key={school.SD_SCHUL_CODE}>
                  <button
                    onClick={() => {
                      onClickSchoolName(school);
                    }}
                    className="flex w-full rounded-lg px-1 py-0.5 hover:bg-neutral-200"
                  >
                    {school.schoolName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-2 text-sm">
        <button className="bg-primary flex w-full items-center justify-center rounded-lg py-2 text-white">
          확인
        </button>
        <button
          onClick={toggleAddProfileMode}
          className="flex w-full items-center justify-center rounded-lg bg-neutral-600 text-white"
        >
          취소
        </button>
      </div>
    </div>
  );
}
