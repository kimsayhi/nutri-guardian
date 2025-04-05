export default function MainProfile() {
  return (
    <div className="m-4 rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-8">
          <button className="border-primary-500 border-b-2 pb-2 font-semibold">중식</button>
          <button className="text-gray-500">석식</button>
        </div>
        <button className="text-gray-500">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22l-1.92 3.32c-.12.22-.07.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">경산고등학교</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">김세한 학생</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">체중</span>
          <span>75kg</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">목표</span>
          <span>균형 식단</span>
        </div>
      </div>

      <div className="mt-4 border-t pt-3">
        <ul className="text-sm">
          <li className="py-1">흑미밥</li>
          <li className="py-1">오징어국</li>
          <li className="py-1">제육볶음</li>
          <li className="py-1">고등어 순살 조림</li>
          <li className="py-1">배추김치</li>
          <li className="py-1">요구르트</li>
        </ul>
      </div>
    </div>
  );
}
