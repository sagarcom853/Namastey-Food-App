import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center mb-4">
            <>
                <img src='https://tse2.explicit.bing.net/th?id=OIP.heeZQ84fzkgUzWydY8ZmPwAAAA&pid=Api&P=0&h=180'
                    alt='page-not-found'
                    className="mt-4 h-[400px] w-full
             "
                />
                <div className=" flex justify-center items-center">
                    <p>Go to Home Instead???</p>
                    <div className="mt-3 bg-blue-400 w-20 rounded-md p-2 text-center"><Link to='/home'>Home</Link></div>
                </div>

            </>

        </div>
    )
}

export default PageNotFound