import Link from "next/link"


const PrimaryButton = ({ url, lable }: { url: string, lable: string }) => {
    return (
        <Link
            href={url}
            className="group inline-flex items-center justify-center gap-x-2 px-6 py-3 rounded-full font-medium text-sm transition-transform duration-500 ease-in-out bg-white text-grey-900 hover:rounded-lg"
        >
            <span className="relative overflow-hidden">
                <span className="transition inline-block group-hover:-translate-y-6 font-medium">
                    {lable} <i className="fa-sharp fa-regular fa-arrow-up-right text-xs" />
                </span>
                <span className="absolute top-0 left-0 translate-y-6 group-hover:translate-y-0 transition font-medium">
                    {lable} <i className="fa-sharp fa-regular fa-arrow-up-right text-xs" />
                </span>
            </span>

        </Link>
    )
}

export default PrimaryButton