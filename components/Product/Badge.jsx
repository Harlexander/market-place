export const Badge = ({content, color}) => (
    <span className={`text-xs inline-block py-1 px-2 md:px-4 font-nunito leading-none text-center whitespace-nowrap align-baseline  ${color} text-white rounded-full`}>{content}</span>
)
