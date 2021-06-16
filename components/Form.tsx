import {ChangeEventHandler, FC, FormEventHandler, ReactChild} from "react";

type Props = {
    onSubmit: FormEventHandler<HTMLFormElement>;
    fields: {
        label: string,
        type: "text" | "password",
        value: string | number,
        onChange: ChangeEventHandler<HTMLInputElement>,
        errors: string[]
    }[];
    buttons: ReactChild
}

export const Form: FC<Props> = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            {props.fields.map(field =>
                <div>
                    <label>{field.label}
                        <input type={field.type} value={field.value} onChange={field.onChange}/>
                    </label>
                    {field.errors?.length > 0 ? <span>{field.errors.join(",")}</span> : null}
                </div>
            )}
            <div>
                {props.buttons}
            </div>
        </form>
    );
};

