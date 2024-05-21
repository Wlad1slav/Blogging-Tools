import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextareaInput from "@/Components/TextareaInput";
import {useState} from "react";
import Alert from "@/Components/Alert";

export default function Create(props) {

    const { data, setData, processing, errors  } = useForm({
        title: '',
        content: '',
    });

    const [successful, setSuccessful] = useState(false);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        axios.post(route('blog.post.store'), data)
            .then(async response => {
                if (response.status === 200) {
                    successfulCreation();
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const successfulCreation = () => {
        setSuccessful(true);
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create new post</h2>}
        >
            <Head title="Create new post" />

            <form onSubmit={submit} className={'p-64 pt-10 pb-10'}>
                <div className='mb-6'>
                    <InputLabel htmlFor="title" value="Post Title" />

                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        className="mt-1 block w-full"
                        isFocused={false}
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="content" value="Post Content" />

                    <TextareaInput
                        id="content"
                        name="content"
                        className="mt-1 block w-full"
                        isFocused={false}
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.content} className="mt-2" />
                </div>

                <div>
                    { successful ? <Alert message='Post Created' className="mt-2" /> : ''}
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
