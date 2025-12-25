import { useState } from "react"
import {Bounce, ToastContainer, toast} from "react-toastify"

export default function UploadImage({setImage,avtfromData}) {
  const [preview, setPreview] = useState("")
    
  const onChangeInputFile = (e) => {
      const files = e.target.files[0]
      
      if(files){
        setImage(files);
        const objectURL = URL.createObjectURL(files)
        setPreview(objectURL)
        return () => URL.revokeObjectURL(objectURL);
      }else{
        toast.warning("Bạn chưa chọn ảnh");
        return
      }
    }

  return (
    <div className="p-10 flex flex-col gap-4 z-50">
      <input 
        id="avt"
        name='avt'
        type="file" 
        accept="image/*"
        onChange={(e)=>onChangeInputFile(e)} 
        className="border p-2"
        hidden
      />
      <label className="relative" htmlFor="avt">
            <p className="border rounded-sm mt-5 py-1 cursor-pointer w-full text-center absolute top-full left-1/2 -translate-1/2">Chọn ảnh</p>
            <img
            className="w-40 h-40 rounded-full object-cover"
            src={
              preview 
              || avtfromData 
              || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMHBhUTBxMVFhUWFxUVEBcXEBASFxYVFRUWFhcRExgYHSggGB0xGxYVITEiJSkrLi8uFx8zPDUsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADUQAQABAgIHBQYGAwEAAAAAAAABAgMEEQUSITFBUXETMmGBkSKhscHR4SMzNEKi8FKSshT/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADK3aquz+HEz0iZdNOjLtX7fWafqDkHZOjLsft/lS5rtiqz+bTMdY2eoMAAAAAAAAAAAAAAAAAAAAAAAe26JuVxFG+dwPbVubteVuM5TOE0VTbjO/7U8uEfV04HCRhbWzfPen+8HSDymmKYyp2PQAeTGe96A4MVoum9Gdv2Z8N3nCFxFirD3MrsZfCfGFpacVh4xNrK55TynnAKwNmIszh7s03N8e+ObWAAAAAAAAAAAAAAAAAAAmNCYbKjXq47KenGf7yQ8RnOxarFvsrUUxwiIBmAAAAAAADg0vhu1w+tTvp2+XGPmgVsmM42qtft9lemnlMwDAAAAAAAAAAAAAAAAAAG3CRniqM/8AKn4rQq2Gq1cTTPKqn4rSAAAAAAAAArmlYyx9Xl/zCxq3pOrWx9XlHpEQDmAAAAAAAAAAAAAAAAAAWjC3e3w8VRxjb14+9V0noXE6tepXx209eQJoAAAAAAAGNyqKKJmrdG2fJVrlfaXJmeMzPql9NYnVt6lG+e905IYAAAAAAAAAAAAAAAAAAAicp2ACe0dj4xFOrc73x8Yd6pROU7EnhNLTRGWJ2xzjf58wTQ02cVRf/KqifDdPo3AA1XcRTZj8WqI8/kDa5MdjYwtHOqd0fOfBx4rS+zLDR5z8oRVdU11Z1znM7wK65uVzNc5zO94AAAAAAAAAAAAAAAAAAAAAAM7Vmq9P4VMz0gGtspvVU92qqOlUw7LeiblXfyjzzn3N9OhdntV/x+4I2b9dXeqq/wBpa0vOheVf8fu0XNEV09yYn1iQR423sNXY/NpmPHh6tQAAAAAAAAAAAAAAAAAAAADbhsNViasrUdZ4R1l14DR03/avbKeEcZ+kJu3bi1RlbjKI3A4MLoqm3tu+1Pu9EhTTFMZU7HoAAAABMZ73DidGUXu57M+G7zh3AKzisHVhp9uNnON32aFsqp1qcqvND4/Rer7WG86fp9ARY8egAAAAAAAAAAAAAAJPRej+0yrvxs/bHPxnwadGYP8A9N3Ovux755J+Iy3A9AAAAAAAAAAABF6T0frxNdiNv7o5+MeKGW1CaXwfZ1a9rdPe8J5gjQAAAAAAAAAAAGVq3N25FNG+dkMUroOxnM11dKfnIJTD2Yw9mKaOH9zbAAAAAAAAAAAAAAY3KIuUTFW6dksgFXxdicNfmmfLxjhLUmtN2NezFUb6d/Sfv8UKAAAAAAAAAAAs2BtdjhaY8NvWdsq5h6O0v0xzmI961QAAAAAAAAAAAAAAAADC7RF23MVcYmPVVqo1asp4bJ8lsVvSVGpjauufrGYOYAAAAAAAAAG/AfraOqzAAAAAAAAAAAAAAAAAAr+mP109IAHEAAAAAD//2Q=="} alt=" " />
      </label>
      <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                    />
    </div>
  );
}