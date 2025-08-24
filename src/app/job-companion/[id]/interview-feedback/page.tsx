"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { BaseResponse } from "@/types/res.type";

export default function InterviewFeedback() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id as string;
  const [feedback, setFeedback] = useState<string>("");
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeedback() {
      setLoading(true);
      try {
        const res = await apiRequest<
          BaseResponse<{ feedback: string; score: number }>
        >(`/interview/feedback/${jobId}`, "GET");
        setFeedback(res.data.feedback);
        setScore(res.data.score);
      } catch (err) {
        setFeedback("Gagal mengambil feedback.");
        setScore(null);
      }
      setLoading(false);
    }
    if (jobId) fetchFeedback();
  }, [jobId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-blue-600 text-white rounded-t-xl px-8 py-4 text-center w-full max-w-2xl">
        <h2 className="text-2xl font-bold">Feedback Wawancara</h2>
        <p className="text-sm">
          Berikut feedback yang diberikan dari hasil simulasi wawancara yang
          telah dilakukan sebelumnya.
        </p>
      </div>
      <div className="bg-white rounded-b-xl shadow-lg px-8 py-8 w-full max-w-2xl flex flex-col items-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex flex-row w-full justify-between items-center">
              <p className="text-gray-700 text-lg">{feedback}</p>
              {score !== null && (
                <div className="flex flex-col items-center bg-blue-100 text-blue-700 rounded-lg px-6 py-2 ml-4">
                  <span className="text-xs font-semibold">Skor</span>
                  <span className="text-3xl font-bold">{score}</span>
                </div>
              )}
            </div>
            <a
              href="/job-companion"
              className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Lamar Pekerjaanmu Sekarang!!
            </a>
            <button
              onClick={() => router.back()}
              className="mt-4 px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              Kembali
            </button>
          </>
        )}
      </div>
    </div>
  );
}
