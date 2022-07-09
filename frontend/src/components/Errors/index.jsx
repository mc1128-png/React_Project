const Errors = (props) => {
    const {errors} = props
    // console.log(errors)
    if (errors) {
        return (
            <ul className="error-messages">
                {/*{*/}
                {/*    Object.keys(errors.errors).map(key => {*/}
                {/*        return (*/}
                {/*            <li key={key}>*/}
                {/*                {key} : {errors[key]}*/}
                {/*            </li>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
                <li>{errors.errors}</li>
            </ul>
        )
    } else {
        return null
    }
}

export default Errors