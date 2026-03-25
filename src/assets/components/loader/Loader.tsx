import { ProgressBar } from "react-loader-spinner"

function Loader() {
    return (
        <div className="absolute  w-full h-auto top-0 left-0 " >
            <ProgressBar
                visible={true}
                height="80"
                width="100%"
                color="#4fa94d"
                ariaLabel="progress-bar-loading"
            />
        </div>
    )
}

export default Loader