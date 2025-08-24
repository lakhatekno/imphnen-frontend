"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <Image
            src="/logo.png"
            alt="KerjaMerdeka Logo"
            className="bg-white rounded"
            width={64}
            height={64}
            style={{ padding: "10px", marginBottom: "10px" }}
          />
          <p>
            Platform pembuatan CV & Cover Letter yang dioptimalkan untuk
            membantu Anda mendapat pekerjaan impian.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Daftar Anggota</h4>
          <ul className="space-y-2">
            <li>M. Iqbal Ghozy</li>
            <li>M. Islakha Khoiruzzaman Tekno Agri</li>
            <li>Seva Giantama Farel</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Hubungi Kami</h4>
          <p>
            Jl. Persatuan III No. 28, Demangan, Maguwoharjo, 55282, Daerah
            Istimewa Yogyakarta
          </p>
          <p>Email: kerja-merdeka@mailsry.web.id</p>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-12">
        © 2025 KerjaMerdeka. All rights reserved.
      </div>
    </footer>
  );
}
