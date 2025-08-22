export default function TestKoPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">한국어 테스트 페이지</h1>
      <p>이 페이지가 보인다면 Next.js 라우팅이 정상 작동합니다.</p>
      <div className="mt-4">
        <a href="/test-en" className="text-blue-600 underline">영어 페이지로 이동</a>
      </div>
      <div className="mt-2">
        <a href="/ko" className="text-blue-600 underline">실제 한국어 홈페이지로 이동</a>
      </div>
    </div>
  );
}