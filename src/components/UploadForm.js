import { useMemo,  useContext } from "react"
import { Context } from "../context/milesandpixelsContext";
import Firestore from "../handlers/firestore";
import Storage from "../handlers/storage";
import { useAuthContext } from "../context/AuthContext";

const { writeDoc, readData } = Firestore;
const { uploadFile, downloadUrl } = Storage;

const Preview = () => {
    const { state } = useContext(Context);
    const { currentUser } = useAuthContext();
    const { inputs } = state
    return (
        inputs.path && <div 
        className="rounded p-1 m-5"
        style={{
            width: "30%",
            height: "300px",
            backgroundImage: `url(${inputs.path}`,
            backgroundSize: "cover",
          }}>
        </div>
    );
};

const UploadForm = () => {
    const { dispatch, state, readData } = useContext(Context)
    const { currentUser } = useAuthContext();
    const {isCollapsed : isVisible, inputs} = state // destructuring what is neede from state
    const handleOnChange = (e) => dispatch({ type: "setInputs", payload: { value: e }})
    const username = currentUser?.displayName.split(" ").join("")
    const handleSubmit = (e) => {
        e.preventDefault()
       try {
        uploadFile(inputs)
        .then(downloadUrl)
        .then(url => {
          writeDoc({...inputs, path: url, user: username.toLowerCase()}, "runs").then(() => {
            readData()
            dispatch({type: 'collapse', payload: {bool: false}}) 
          })

        })
       } catch (error) {
        console.log(error);
       }

    }
    const isDisabled = useMemo(() => {
        return !!Object.values(inputs).some(input => !input)
    }, [inputs])
    return (
        isVisible && currentUser && <>
        <p className="display-6 text-center mb-3">Upload Stock Image</p>
        <div className="mb-5 d-flex align-items-center justify-content-center">
        <Preview />
        <form className="mb-2" style={{ textAlign: "left" }} onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="title"
                aria-describedby="text"
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="description"
                aria-describedby="text"
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3">
              <input type="file" className="form-control" name="file" onChange={handleOnChange}/>
            </div>
            <button
              type="submit"
              className="btn btn-light float-end"
              disabled={isDisabled}
            >
              Save changes
            </button>
          </form>
        </div>
        </>
      );
    };
  export default UploadForm;  