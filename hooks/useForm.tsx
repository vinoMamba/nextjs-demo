import {ChangeEventHandler, ReactChild, useCallback, useState} from "react";
import {AxiosResponse} from "axios";

type Field<T> = {
    label: string,
    type: "text" | "password" | "textarea",
    key: keyof T
}
type UseFromOptions<T> = {
    initFormData: T;
    fields: Field<T>[];
    buttons: ReactChild;
    submit: {
        request: (formData: T) => Promise<T>;
        message: string;
    }
}

export function useForm<T extends Object>(options: UseFromOptions<T>) {
    const {initFormData, fields, buttons, submit} = options;
    //非受控
    const [formData, setFormData] = useState(initFormData);
    const [errors, setErrors] = useState(() => {
        const e: { [k in keyof T]?: string[] } = {};
        for (let key in initFormData) {
            if (initFormData.hasOwnProperty(key)) {
                e[key] = [];
            }
        }
        return e;
    });
    const onChange = useCallback((key: keyof T, value: any) => {
        setFormData({...formData, [key]: value});
    }, [formData]);
    const _onSubmit = useCallback((e) => {
        e.preventDefault();
        submit.request(formData).then(
            () => {
                window.alert(submit.message);
            },
            error => {
                const response: AxiosResponse = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data);
                }
            }
        );
    }, [submit, formData]);
    const form = (
        <form onSubmit={_onSubmit}>
            {fields.map(field =>
                <div>
                    <label>{field.label}
                        {field.type === "textarea" ? <textarea
                                onChange={(e) => onChange(field.key, e.target.value)}
                                value={(formData[field.key] as Object).toString()}/> :
                            <input type={field.type}
                                   value={(formData[field.key] as Object).toString()}
                                   onChange={(e) => onChange(field.key, e.target.value)}/>
                        }
                    </label>
                    {errors[field.key]!.length > 0 ? <span>{errors[field.key]!.join(",")}</span> : null}
                </div>
            )}
            <div>
                {buttons}
            </div>
        </form>
    );

    return {
        form,
        setErrors
    };
}