import { FaWhatsapp } from "react-icons/fa"

export default function WhatsAppBtn(){
    return(
        <>
        <a
        href="https://wa.me/919559338089?text=Hello%20I%20want%20to%20know%20about%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center text-2xl"
        >
        <FaWhatsapp />
        </a>
        </>
    )   
}