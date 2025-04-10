export default function ReportSummary() {
  return (
    <div className="bg-primary-100 rounded-lg p-4 shadow-sm">
      <p className="text-sm">
        <span>단백질이</span>
        <span className="font-medium text-red-500"> 매우 부족</span>합니다.
      </p>
      <p className="text-sm">단백질 위주의 식사가 필요합니다.</p>
    </div>
  );
}
