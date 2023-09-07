import { useState, useEffect } from "react";

const Contact = () => {
  const [contactData, setContactData] = useState({ name: "", email: "", comments: "", doc: "" })
  const [imageURL, setImageURL] = useState('')
  const [previewMode, setPreviewMode] = useState(false)

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setContactData({ ...contactData, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (contactData.name !== "" && contactData.email !== "" && contactData.comments && contactData.doc && !previewMode) {
      console.log("contactdata", contactData)
      setContactData({ ...contactData, name: "", email: "", comments: "", doc: "" })
    }
  }
  useEffect(() => {
    if (contactData.doc && previewMode) {
      if (contactData.doc.type === "application/pdf") {
        // Open the preview in a new tab using the URL.createObjectURL method
        window.open(URL.createObjectURL(contactData.doc), "_blank");
        setPreviewMode(!previewMode)
      }
      setImageURL(URL.createObjectURL(contactData.doc))
    }
  }, [contactData.doc, previewMode])

  return (
    <div className="flex flex-wrap flex-row justify-around m-6">
      <div className='flex flex-wrap flex-col'>
        <div className='flex flex-col border-2 border-gray-300 w-80 p-4 mb-4 mt-6'>
          <div className="font-bold text-xl">
            Namaste Foods
          </div>
          <ul>
            <li>
              Address: 1234 Delicious Street, Suite 567 City: Foodville State:
              Stateville Country: United States Postal Code: 12345
            </li>
            <li>
              Phone: +1-123-456-7890
            </li>
            <li>
              Email: info@namastefood.com
            </li>
            <li>Website:www.namastefood.com</li>
          </ul>
        </div>
        <div className='flex flex-col border-2 border-gray-300 w-80 p-4 mb-4'>
          <h2 className="font-bold text-xl">For Customer Support: </h2>
          <p>
            Phone: +1-987-654-3210
            <p> Email: support@namastefood.com</p>
          </p>
          <h2>For Business Inquiries:</h2>
          <p>Phone: +1-789-456-1230 Email: business@namastefood.com</p>
        </div>
      </div>
      <div className="flex flex-wrap flex-col"  >
        <div className='flex flex-col border-2 border-gray-300 w-80 p-4 mb-4 mt-6'>
          <h2 className="font-bold text-xl">Social Media: </h2>
          <p>
            Facebook: www.facebook.com/namastefood
            <p> Twitter: www.twitter.com/namastefood</p>
            <p>Instagram: www.instagram.com/namastefood</p>
          </p>
        </div>
        <div className='flex flex-col border-2 border-gray-300 w-80 p-4 mb-4'>
          We are available to assist you with any inquiries, feedback, or support
          requests you may have. Feel free to contact us through the provided
          phone numbers, email addresses, or visit our website and social media
          profiles for more information about Namaste Food and our services. We
          look forward to hearing from you!
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-grey">Still got a question? Contact us!</div>
        <div className="border-2 border-gray-300 p-6 mb-4 bg-gray-100 w-96">
          <form className="flex flex-wrap flex-col gap-4 my-2 " onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="Enter name" id="name" value={contactData.name} name="name" className="hover: outline-gray-500 rounded-lg p-2" onChange={handleChange} />

            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter email" id="email" value={contactData.email} name="email" className="hover: outline-gray-500 rounded-lg  p-2" onChange={handleChange} />

            <label htmlFor="comments">Leave your feedback
            </label>
            <textarea type="text" id="comments" value={contactData.comments} name="comments" className="hover: outline-gray-500 p-2 rounded-lg" onChange={handleChange} />
            <label htmlFor="file" id="file">Upload Document
            </label>
            <input type="file" name="file" id="file" accept="file" onChange={(e) => { e.preventDefault(); setContactData({ ...contactData, doc: e.target.files[0] }) }} />
            {imageURL && previewMode && contactData.doc.type === "image/jpeg" && (
              <>
                <div>Image Preview:</div>
                <img src={imageURL} alt={contactData.doc.name} height="50px" />
              </>
            )}
            {console.log("cont", contactData.doc)}
            {contactData.doc ? <button className=" border-solid border-1 border-black w-28 h-10 bg-gray-200 hover:bg-gray-400" onClick={() => setPreviewMode(!previewMode)}>
              {previewMode ? "Hide Preview" : "Preview"}
            </button> : " "}

            <button className="bg-teal-400 hover:bg-teal-200 h-10 rounded-lg w-full" type="submit">Submit</button>
          </form>
        </div>
      </div >

    </div>
  );
};
export default Contact;
