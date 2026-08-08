import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function InternationalPhone({

    value,

    onChange,

    placeholder = "Phone number"

}) {


    return (

        <div
            className="
            rounded-[22px]

            border
            border-white/10

            bg-white/10

            backdrop-blur-3xl

            px-5
            py-3

            shadow-[inset_4px_4px_12px_rgba(255,255,255,.08),10px_10px_30px_rgba(0,0,0,.30)]

            "

        >

            <PhoneInput

                defaultCountry="KE"

                international

                value={value}

                onChange={onChange}

                placeholder={placeholder}

                className="
                phone-input
                "

            />


            <style>{`

                .phone-input {

                    display:flex;
                    align-items:center;
                    gap:12px;

                }


                .phone-input input {

                    width:100%;

                    background:transparent;

                    color:white;

                    outline:none;

                    font-size:16px;

                }


                .phone-input input::placeholder {

                    color:rgba(255,255,255,.4);

                }


                .phone-input select {

                    background:rgba(255,255,255,.1);

                    color:white;

                    border-radius:12px;

                    padding:8px;

                    border:none;

                }


                .PhoneInputCountryIcon {

                    border-radius:8px;

                }


            `}</style>

        </div>

    );

}
