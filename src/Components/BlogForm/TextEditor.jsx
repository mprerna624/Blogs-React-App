import { Editor } from '@tinymce/tinymce-react';
import React, { useId } from 'react'
import { Controller } from 'react-hook-form';

function TextEditor({name, control, label, defaultValue=""}) {

    const id = useId();

  return (
    <div className='w-full'>
        {
            label && (
                <label htmlFor={id}>{label}</label>
            )
        }

        <Controller
            id={id}
            name={name || "content"}
            control={control}
            render={({field: {onChange}}) => (
                <Editor
                    apiKey='h4qa27biu48w03fia5q1ctjsgzwlmz2a3z7mb6qzirbn85m3'
                    initialValue={defaultValue}
                    init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                            "image", "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount", "anchor"
                        ],
                        toolbar:
                        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}
                    onEditorChange={onChange}
                />
            )}
        />
    </div>
  )
}

export default TextEditor