import Image from "next/image";

export default function Home() {
  const features = [
    {
      title: "Simulasi Interview",
      desc: "Latih kesiapan diri saat sesi interview dengan simulasi interview bersama AI yang telah disesuaikan dengan bidang pekerjaan yang dilamar",
      icon: "interview",
    },
    {
      title: "CV Builder Pintar",
      desc: "Buat CV yang dioptimalkan dengan kata kunci dan keterampilan yang relevan dengan posisi yang dilamar",
      icon: "cv-builder",
    },
    {
      title: "Cover Letter AI",
      desc: "Hasilkan cover letter yang dipersonalisasi dan meyakinkan yang menunjukkan kecocokan Anda dengan posisi tersebut",
      icon: "cover-letter",
    },
    {
      title: "Optimasi ATS",
      desc: "Pastikan dokumen Anda lolos Applicant Tracking System (ATS) dengan format dan kata kunci yang tepat",
      icon: "ats-optimization",
    },
  ];

  const steps = [
    {
      title: "Input Lowongan",
      icon: "job-input",
      desc: "Tempel link atau deskripsi lowongan pekerjaan yang Anda ingin lamar",
    },
    {
      title: "Analisis AI",
      icon: "cover-letter",
      desc: "AI kami menganalisis persyaratan dan kata kunci penting dari lowongan tersebut",
    },
    {
      title: "Simulasi Interview",
      icon: "interview",
      desc: "Latih kemampuan interview Anda dengan AI yang mensimulasikan pertanyaan spesifik untuk posisi yang dilamar",
    },
    {
      title: "Buat Dokumen",
      icon: "cv-builder",
      desc: "Lengkapi profil Anda untuk membuat dokumen CV dan cover letter",
    },
    {
      title: "Unduh & Lamar",
      icon: "apply",
      desc: "Unduh dokumen yang sudah dioptimalkan dan gunakan untuk melamar pekerjaan",
    },
  ];

  return (
    <>
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold leading-snug">
            Buat CV & Cover Letter yang Sesuai dengan Lowongan Pekerjaan
          </h1>
          <p className="text-gray-600">
            KerjaMerdeka membantu Anda membuat CV dan cover letter yang
            dioptimalkan untuk lowongan pekerjaan spesifik, meningkatkan peluang
            Anda untuk dipanggil interview
          </p>
        </div>
        <div className="flex-1">
          <Image
            src="/hero.jpg"
            alt="Hero"
            className="rounded-xl shadow-lg"
            width={500}
            height={300}
          />
        </div>
      </section>
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-bold">Fitur Unggulan KerjaMerdeka</h2>
          <p className="text-gray-600">
            Kami menyediakan berbagai fitur untuk membantu Anda membuat dokumen
            aplikasi kerja yang sesuai dengan lowongan pekerjaan impian
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white shadow p-6 rounded-xl text-left">
                <div className="w-12 h-12">
                  <Image
                    src={`/icons/${f.icon}.png`}
                    alt={f.title}
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className="font-semibold text-xl mt-4">{f.title}</h3>
                <p className="text-gray-600 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="steps" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-bold">Cara Kerja KerjaMerdeka</h2>
          <p className="text-gray-600">
            Lima langkah sederhana untuk membuat dokumen aplikasi kerja yang
            optimal
          </p>
          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center text-center"
              >
                <div className="w-12 h-12">
                  <Image
                    src={`/icons/${step.icon}.png`}
                    alt={step.title}
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className="font-semibold mt-4">
                  {i + 1}. {step.title}
                </h3>
                <p className="text-gray-600 text-sm mt-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-blue-600 text-center text-white rounded-2xl">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">
            Siap Membuat Dokumen Aplikasi yang Optimal?
          </h2>
          <p>
            Tingkatkan peluang Anda untuk mendapatkan panggilan interview dengan
            CV dan cover letter yang dioptimalkan untuk lowongan spesifik
          </p>
          <a
            href="#"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
          >
            Buat CV Sekarang
          </a>
        </div>
      </section>
    </>
  );
}
