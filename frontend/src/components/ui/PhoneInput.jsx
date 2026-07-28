import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";


export default function InternationalPhone({
value,
onChange
}){


return (

<PhoneInput

defaultCountry="KE"

international

value={value}

onChange={onChange}

/>

)

}
