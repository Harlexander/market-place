import LongText from "../Text/LongText";

export const Description = ({description}) => (
    <div className='space-y-3'>
        <p className='font-semibold text-lg font-montserrat'>Description</p>
        <div className='font-nunito text-sm' style={{whiteSpace : "pre-line"}}>
            <LongText text={description} maxChars={280}/>
        </div>        
    </div>

)