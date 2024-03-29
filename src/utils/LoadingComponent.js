import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingComponent = () => {
    return (
        <div className='fixed bg-white bg-opacity-50 top-0 right-0 bottom-0 left-0 flex items-center justify-center z-[1000]'>
            <div className='flex flex-col gap-3px'>
                <CircularProgress color="secondary" />
                <h1 className='text-white font-bold text-xl -ml-6'>Loading.....</h1>
            </div>
        </div>
    )
}
export default LoadingComponent