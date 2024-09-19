const GeneralButtons = ({classBtnG, textContent, disambled, Clickbtn}) => {
    return(
        <>
        <button
            className={`btn ${classBtnG}`}
            disabled={disambled}
            onClick={Clickbtn}
        >
            {textContent}
        </button>
        </>
    );

}

GeneralButtons.defaultProps = {
    Clickbtn: () => {},
    disabled: false,
    classBtnG: 'btn-primary',
    textContent: 'ButonG'
}


export default GeneralButtons;