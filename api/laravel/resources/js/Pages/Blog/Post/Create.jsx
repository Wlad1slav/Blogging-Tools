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

    const { data, setData, processing  } = useForm({
        title: '',
        content: '',
    });

    // The variable that follows whether the created post was correct
    const [successful, setSuccessful] = useState(false);

    // Record errors when executing the form
    const [errors, setErrors] = useState({});

    // Data storage
    const handleOnChange = (event) => {
        if (event.target.name === 'images') {
            setData(event.target.name, event.target.files);
        } else {
            setData(event.target.name, event.target.value);
        }
    };

    // When saving a post
    const submit = (e) => {
        e.preventDefault();

        // Creation of an object with all parameters that will be transferred to the server
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);

        // Inclusion in the parameters of all images
        if (data.images) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append('images[]', data.images[i]);
            }
        }

        axios.post(route('blog.post.store'), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(async response => {
                if (response.status === 200) {
                    setSuccessful(true); // Message about the successful saving of the post
                }
            })
            .catch(error => {
                console.log(error);
                setErrors(error.response.data.errors);
                console.log('errors');
                setSuccessful(false);
            });
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create new post</h2>}
        >
            <Head title="Create new post" />

            <form onSubmit={submit} className={'p-64 pt-10 pb-10'} encType="multipart/form-data">
                <div className='mb-6'>
                    <InputLabel htmlFor="title" value="Post Title" />

                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        className="mt-1 block w-full rounded-md"
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
                        className="mt-1 block w-full mb-6 rounded-md"
                        isFocused={false}
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.content} className="mt-2" />
                </div>

                <div className='flex justify-between'>
                    <div>
                        <InputLabel htmlFor="images" value="Post Images" />

                        <TextInput
                            id="images"
                            type="file"
                            name="images"
                            accept="image/*"
                            className='mb-6'
                            multiple
                            isFocused={false}
                            onChange={handleOnChange}
                        />

                        <InputError message={errors.images} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </div>

                <div>
                    { successful ? <Alert message='Post created' className="mt-2" /> : ''}
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
