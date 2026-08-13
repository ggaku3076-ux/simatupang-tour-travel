import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface ContactProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactProps> = ({ onOpenBooking }) => {
  const { contactInfo } = useAdmin();

  return (
    <section id="kontak" className="py-24 bg-zinc-50 border-t border-zinc-200 px-6 md:px-12 text-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column Sliding from Left */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-6 space-y-6"
        >
          <span className="text-xs uppercase font-semibold tracking-widest text-zinc-600">
            Hubungi Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">
            Siap Memulai Perjalanan Impian Anda?
          </h2>
          <p className="text-sm text-zinc-700 leading-relaxed font-medium">
            Konsultasikan jadwal wisata Kawah Ijen, Bromo, atau pemesanan mobil pengantin pernikahan Anda langsung dengan tim operasional Simatupang Tour & Travel.
          </p>

          <div className="space-y-4 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="flex items-center gap-4 bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm"
            >
              <Phone className="w-5 h-5 text-zinc-900" />
              <div>
                <h3 className="text-xs text-zinc-600 font-semibold">WhatsApp / Telepon</h3>
                <a href={`https://wa.me/${contactInfo.whatsappRaw}`} target="_blank" rel="noreferrer" className="text-sm text-zinc-950 font-bold hover:underline">
                  {contactInfo.phone}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.18 }}
              className="flex items-center gap-4 bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm"
            >
              <Mail className="w-5 h-5 text-zinc-900" />
              <div>
                <h3 className="text-xs text-zinc-600 font-semibold">Email Resmi</h3>
                <p className="text-sm text-zinc-950 font-bold">{contactInfo.email}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="flex items-center gap-4 bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm"
            >
              <MapPin className="w-5 h-5 text-zinc-900" />
              <div>
                <h3 className="text-xs text-zinc-600 font-semibold">Alamat Kantor</h3>
                <p className="text-sm text-zinc-950 font-bold">{contactInfo.address}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Form Card Sliding from Right */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="lg:col-span-6 flex items-center"
        >
          <div className="w-full bg-white border border-zinc-200 p-8 rounded-3xl space-y-6 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900">Kirim Pesan Langsung</h3>
            <p className="text-xs text-zinc-600 font-medium">Isi formulir di bawah ini untuk konsultasi via WhatsApp:</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onOpenBooking();
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="contact-name" className="block text-xs text-zinc-700 font-semibold mb-1">Nama Lengkap</label>
                <input
                  id="contact-name"
                  name="contact-name"
                  type="text"
                  placeholder="Masukkan nama Anda"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 font-medium"
                  required
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs text-zinc-700 font-semibold mb-1">Nomor WhatsApp</label>
                <input
                  id="contact-phone"
                  name="contact-phone"
                  type="tel"
                  placeholder={contactInfo.whatsappRaw}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 font-medium"
                  required
                />
              </div>

              <div>
                <label htmlFor="contact-service" className="block text-xs text-zinc-700 font-semibold mb-1">Jenis Layanan</label>
                <select
                  id="contact-service"
                  name="contact-service"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 font-medium"
                >
                  <option value="ijen">Paket Kawah Ijen</option>
                  <option value="bromo">Paket Bromo</option>
                  <option value="pulau-merah">Pantai Pulau Merah</option>
                  <option value="banyuwangi">Wisata Banyuwangi All-In</option>
                  <option value="wedding">Layanan Wedding Car</option>
                </select>
              </div>

              <button
                type="submit"
                aria-label="Kirim formulir konsultasi via WhatsApp"
                className="w-full bg-zinc-900 hover:bg-black text-white font-semibold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Kirim via WhatsApp</span>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
