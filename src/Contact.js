import { useState, useEffect } from "react";
import { LOCALES } from "./i18n/local"
import { messages } from "./i18n/message"
import { IntlProvider } from "react-intl";
import { FormattedMessage } from "react-intl";
// const locale = LOCALES.ENGLISH;
import { useSelector } from 'react-redux'

const Language = [
  { term: "en-US", value: 'ENGLISH' },
  { term: "ja-JA", value: 'JAPANESE' },
  { value: 'FRENCH', term: "fr-FR" },
  { value: 'GERMAN', term: "de-DE" },
  { value: 'HINDI', term: 'hi-IN' }
]

const Contact = () => {
  const [contactData, setContactData] = useState({ name: "", email: "", comments: "", doc: "" })
  const [imageURL, setImageURL] = useState('')
  const [previewMode, setPreviewMode] = useState(false)
  const [locale, setLocale] = useState(LOCALES.ENGLISH)
  const darkMode = useSelector((store) => store?.cart.dark);

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

  // useEffect(() => {
  //   setLocale('ENGLISH')
  // }, [])

  const handleChangeLocale = (e) => {
    setLocale(e.target.value)
  }

  return (
    <>
      <div className="flex flex-end m-2">
        <label htmlFor="locale">Language &nbsp;&nbsp;</label>
        <select className={`border w-32 border-gray-300 focus:border-gray-500 transition-all duration-300 px-2 py-1 outline-none  rounded ${darkMode ? 'darkModeCSS' : ""}`} value={locale} onChange={handleChangeLocale} id="locale" name="locale">
          {Language?.map((lang) => {
            return <option className="border-solid border-gray-300 outline-none" id={lang.value}>{lang.term}</option>
          })}
        </select>
      </div>
      <div className="flex flex-wrap flex-row justify-around m-6">
        <IntlProvider messages={messages[locale]}
          locale={locale}
          defaultLocale={LOCALES.ENGLISH}>

          <div className='flex flex-wrap flex-col'>
            <div className='flex flex-col border-2 border-gray-300 w-80 p-4 mb-4 mt-6'>
              <div className="font-bold text-xl">
                {<FormattedMessage id="HotelName" value={locale.HotelName} />}
              </div>
              <ul>
                <li>
                  Address: {<FormattedMessage id="Address" value={locale.Address} />}
                </li>
                <li>
                  Phone: {<FormattedMessage id="Phone" value={locale.Phone} />}
                </li>
                <li>
                  Email:  {<FormattedMessage id="App_Email" value={locale.App_Email} />}
                </li>
                <li>Website: {<FormattedMessage id="Website" value={locale.Website} />}</li>
              </ul>
            </div>
            <div className='flex flex-col border-2 border-gray-300 w-80 p-4 mb-4'>
              <h2 className="font-bold text-xl">  {<FormattedMessage id="customer_support_caption" value={locale.customer_support_caption} />}</h2>
              <p>
                Phone:   {<FormattedMessage id="support_phone" value={locale.support_phone} />}
                <p> Email:   {<FormattedMessage id="support_Email" value={locale.support_Email} />}</p>
              </p>
              <h2>  {<FormattedMessage id="Business_Inquiries_Caption" value={locale.Business_Inquiries_Caption} />}</h2>
              <p>Phone:   {<FormattedMessage id="Business_Inquiries_Phone" value={locale.Business_Inquiries_Phone} />} Email:   {<FormattedMessage id="Business_Inquiries_Email" value={locale.Business_Inquiries_Email} />}</p>
            </div>
          </div>
          <div className={`flex flex-wrap flex-col ${darkMode ? 'darkModeCSS' : ''}`} >
            <div className='flex flex-col border-2 border-gray-300 w-80 p-4 mb-4 mt-6'>
              <h2 className="font-bold text-xl"><FormattedMessage id="social_Media" value={locale.social_Media} /> </h2>

              <p>Facebook: {<FormattedMessage id="Facebook" value={locale.Facebook} />}</p>
              <p> Twitter:{<FormattedMessage id="Twitter" value={locale.Twitter} />} </p>
              <p>Instagram: {<FormattedMessage id="Instagram" value={locale.Instagram} />}</p>

            </div>

            <div className='flex flex-col border-2 border-gray-300 w-80 p-4 mb-4'>
              <div><FormattedMessage id="Assist_message" value={locale.Assist_message} /></div>
            </div>
          </div>

          <div className={`flex flex-wrap flex-col`}>
            <div className="text-grey bg-none">{<FormattedMessage id="still_got_question" value={locale.still_got_question} />}</div>
            <div className={`border-2 border-gray-300 p-6 mb-4 w-96 ${darkMode ? 'darkModeCSS' : 'bg-gray-100'}`}>
              <form className="flex flex-wrap flex-col gap-4 my-2 " onSubmit={handleSubmit}>
                <label htmlFor="name"><FormattedMessage id="Name" value={locale.Name} /> </label>
                <input type="text" placeholder="Enter name" id="name" value={contactData.name} name="name" className="hover: outline-gray-500 rounded-lg p-2" onChange={handleChange} />

                <label htmlFor="email"><FormattedMessage id="Email" value={locale.Email} /> </label>
                <input type="email" placeholder="Enter email" id="email" value={contactData.email} name="email" className="hover: outline-gray-500 rounded-lg  p-2" onChange={handleChange} />

                <label htmlFor="comments"><FormattedMessage id="Leave_feedback_caption" value={locale.Leave_fedback_caption} />
                </label>
                <textarea type="text" id="comments" value={contactData.comments} name="comments" className="hover: outline-gray-500 p-2 rounded-lg" onChange={handleChange} />
                <label htmlFor="file" id="file"><FormattedMessage id="Upload_document" value={locale.Upload_document} /> </label>
                <input type="file" name="file" id="file" accept="file" onChange={(e) => { e.preventDefault(); setContactData({ ...contactData, doc: e.target.files[0] }) }} />
                {imageURL && previewMode && contactData.doc.type === "image/jpeg" && (
                  <>
                    <div><FormattedMessage id="Image_Preview" value={locale.Image_Preview} /> </div>
                    <img src={imageURL} alt={contactData.doc.name} height="50px" />
                  </>
                )}
                {console.log("cont", contactData.doc)}
                {contactData.doc ? <button className={`${darkMode ? 'text-black bg-gray-100' : ''} border-solid border-1 border-black w-28 h-10 bg-gray-200 hover:bg-gray-400`} onClick={() => setPreviewMode(!previewMode)}>
                  {previewMode ? "Hide Preview" : "Preview"}
                </button> : " "}

                <button className="bg-teal-400 hover:bg-teal-200 h-10 rounded-lg w-full" type="submit"><FormattedMessage id="Submit" value={locale.Submit} /> </button>
              </form>
            </div>
          </div >
        </IntlProvider >

      </div>
    </>

  );
};
export default Contact;
