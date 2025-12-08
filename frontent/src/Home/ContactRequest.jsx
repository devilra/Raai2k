import { motion } from "framer-motion";

const fadeLeft = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.5, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.5, ease: "easeOut" },
  },
};

export default function ContactRequest() {
  return (
    <section className="w-full bg-[#243253] py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start justify-between gap-16">
        {/* LEFT BOX */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="md:w-1/2 w-full border border-yellow-400 rounded-xl p-10 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Request a call back
          </h2>

          <p className="text-gray-200 leading-relaxed text-lg">
            Would you like to speak to one of our financial advisers over the
            phone? Just submit your details and we’ll be in touch shortly. You
            can also email us if you would prefer.
          </p>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="md:w-1/2 w-full"
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            I would like to discuss:
          </h3>

          <form className="flex flex-col gap-6">
            {/* ROW 1 */}
            <div className="flex flex-col md:flex-row gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full md:w-1/2 px-4 py-3 bg-white rounded-md outline-none"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full md:w-1/2 px-4 bg-white py-3 rounded-md outline-none"
              />
            </div>

            {/* ROW 2 */}
            <div className="flex flex-col md:flex-row gap-6">
              <input
                type="text"
                placeholder="Subject"
                className="w-full md:w-2/3 px-4 py-3 bg-white rounded-md outline-none"
              />

              <button
                type="submit"
                className="w-full md:w-1/3 bg-[#FFD422] text-black font-semibold py-3 rounded-md hover:bg-yellow-400 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
