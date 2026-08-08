export default function DashboardPage({
  title,
  subtitle,
  eyebrow,
  children
}) {

  return (

    <div className="min-h-screen bg-[#F5F5F5]">

      {/* PAGE HEADER */}

      <section
        className="
          bg-black
          text-white
          rounded-[28px]
          px-7
          py-8
          md:px-8
          md:py-9
          mb-8
        "
      >

        {eyebrow && (

          <p
            className="
              text-green-500
              text-xs
              md:text-sm
              font-black
              uppercase
              tracking-[0.15em]
              mb-3
            "
          >

            {eyebrow}

          </p>

        )}


        <h1
          className="
            text-3xl
            md:text-4xl
            font-black
            text-white
            tracking-tight
          "
        >

          {title}

        </h1>


        {subtitle && (

          <p
            className="
              text-gray-300
              font-semibold
              mt-2
              text-sm
              md:text-base
              max-w-2xl
            "
          >

            {subtitle}

          </p>

        )}

      </section>


      {/* PAGE CONTENT */}

      <section>

        {children}

      </section>

    </div>

  );

}
