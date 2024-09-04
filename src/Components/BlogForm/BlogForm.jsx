import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, InputBox, TextEditor, Dropdown } from '../index';
import appwriteService from '../../appwrite/configService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function BlogForm({blog}) {

    const navigate = useNavigate();

    const userInfo = useSelector(state => state.auth.userData);

    const {register, handleSubmit, control, getValues, setValue, watch} = useForm({
        defaultValues:{
            title: blog?.title || '',
            slug: blog?.slug || '',
            content: blog?.content || '',
            status: blog?.status || 'active'
        }
    });

    const formSubmitHandler = async(data) => {
        // Case 1 : Edit Blog (if block)
        // Case 2 : Add Blog (else block)

        if(blog) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) :  null;

            if(file) appwriteService.deleteFile(blog.featuredImage);

            const dbBlog = await appwriteService.updateBlog(blog.$id, {
                ...data, 
                featuredImage: file ? file.$id : featuredImage
            });

            if(dbBlog) navigate(`/blog/${dbBlog.slug}/${dbBlog.$id}`);
        } 
        else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if(file) {
                const dbBlog = await appwriteService.createBlog({
                    ...data,
                    featuredImage: file.$id,
                    userId: userInfo.$id
                });

                if(dbBlog) navigate(`/blog/${dbBlog.slug}/${dbBlog.$id}`);
            }
        }
    }

    const slugTransform = useCallback( (value) => {
        if(value && typeof value === 'string') {
            return value
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z\d\s]+/g, '-')
                    .replace(/\s/g, '-')
        }

        return '';
    }, [])

    useEffect( () => {
        const subscription = watch( (value, {name}) => {
            if(name === 'title') {
                setValue('slug', slugTransform(value.title, {shouldValidate: true}))
            }
        } );

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className='flex flex-wrap py-8'>
        <div className="w-2/3 px-4">
            <InputBox
                label="Title:"
                type="text"
                placeholder="Title"
                className="mb-4"
                {
                    ...register("title", {
                        required: true
                    })
                }
            />

            <InputBox
                label="Slug:"
                type="text"
                placeholder="Slug"
                className="mb-4"
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
                }}
                {
                    ...register("slug", {
                        required: true
                    })
                }
            />

            <TextEditor name="content" control={control} label="Content:" defaultValue={getValues("content")}  />
        </div>

        <div className="w-1/3 px-4">
            <InputBox
                label="Featured Image:"
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                className="mb-4 bg-white"
                {
                    ...register("image", {
                        required: !blog
                    })
                }
            />
            {
                blog && (
                    <div className='w-full'>
                        <img src={appwriteService.getFilePreview(blog.featuredImage)} alt={blog.slug} />
                    </div>
                )
            }

            <Dropdown 
                label="Status:" 
                options={["active", "inactive"]} 
                className="mb-4"
                {
                    ...register("status", {
                        required: true
                    })
                }
            />

            <Button type='submit' bgColor={blog ? "bg-green-500" : undefined} className='w-full'>
                {blog ? "Update" : "Submit"}
            </Button>
        </div>

    </form>
  )
}

export default BlogForm