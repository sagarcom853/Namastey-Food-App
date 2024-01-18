import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingComponent = () => {
    return (
        <div className='fixed bg-white bg-opacity-50 top-0 right-0 bottom-0 left-0 flex items-center justify-center z-[1000]'>
            <CircularProgress color="secondary" />
        </div>
    )
}
export default LoadingComponent