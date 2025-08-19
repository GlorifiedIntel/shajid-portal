// app/api/student/route.js
export async function GET() {
  const student = {
    fullName: "John Doe",
    matricNo: "SRCN/25/001",
    admissionYear: 2023,
    passport: "/Jane.jpg", // make sure you have this image in /public
  };

  return new Response(JSON.stringify(student), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}