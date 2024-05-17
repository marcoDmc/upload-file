"use client"

import { FormComponent } from "@/components/FormComponent/Form"
import { Http } from "@/app/config/axiosConfig"
import { methods } from "@/utils/methods"
import { ChangeEvent, useState } from "react"
import Icon from "@/utils/icons"
import cookie from "js-cookie"



export default function Signup() {

    const [credential, setCredential] = useState({ nickname: "", password: "", email: "" })

    const handleSubmit = async (event: any) => {

        event.preventDefault()

        const testNickname = methods.handleVerifyNickname(credential.nickname)
        const testPassword = methods.handleVerifyPassword(credential.password)
        const testEmail = methods.handleVerifyEmail(credential.email)


        if (!testNickname || !testPassword || !testEmail) return


        const data = {
            nickname: credential.nickname,
            email: credential.email,
            password: credential.password
        }


        try {
            await Http.post("/user/create", data)
                .then(res => window.alert(res.data))
                .catch(err => err)
        } catch (err) {
            console.error(err)
        }
        cookie.set("nickname", credential.nickname)
        cookie.set("password", credential.password)

    }


    const handleNickname = (e: ChangeEvent<HTMLInputElement>) => setCredential({ ...credential, nickname: e.target.value })
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setCredential({ ...credential, password: e.target.value })
    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setCredential({ ...credential, email: e.target.value })





    return (
        <>
            <section className="
                        h-screen
                        flex
                        flex-col
                        items-center
                        justify-center
                        bg-zinc-900
                        ">

                <FormComponent.Root handleSubmit={handleSubmit}>
                    <FormComponent.Content>
                        <fieldset className="
                        
                                border
                                border-zinc-500
                                h-full
                                grid
                                gap-3
                                place-items-center
                                bg-zinc-800
                                p-2
                                px-4
                                rounded-xl
                                w-full
                                relative
                                after:content-['']
                                after:absolute
                                after:w-full
                                after:h-px
                                after:bg-neutral-700
                                after:top-11
                                " >
                            <label htmlFor="nickname" className="w-full flex">
                                <input type="text"
                                    id="nickname"
                                    placeholder="your nickname"
                                    value={credential.nickname}
                                    autoComplete="off"
                                    onChange={handleNickname}
                                    className="
                                    bg-transparent
                                    w-full
                                    p-1
                                    outline-none
                                    text-neutral-100
                                    placeholder:text-sm
                                    "
                                />
                            </label>
                            <label htmlFor="email" className="w-full flex
                               items-center
                               justify-between
                            ">
                                <input type="email"
                                    id="email"
                                    placeholder="you@domain.com"
                                    value={credential.email}
                                    onChange={handleEmail}
                                    autoComplete="off"
                                    className="
                                    bg-transparent
                                    w-full
                                    p-1
                                    outline-none
                                    placeholder:text-sm
                                    text-neutral-100
                                    "
                                />

                                <Icon.BsAt size={25} style={{ color: "#fff" }} />
                            </label>
                            <label htmlFor="password" className="
                                    w-full flex
                                    items-center
                                    justify-between
                                    " >
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="your secret password"
                                    value={credential.password}
                                    onChange={handlePassword}
                                    autoComplete="off"
                                    className="
                                    w-full
                                    p-1
                                    outline-none
                                    text-neutral-100
                                    bg-transparent
                                    placeholder:text-sm
                                    "
                                />
                                <Icon.BsKey size={25} style={{ color: "#fff" }} />;
                            </label>
                        </fieldset>
                        <FormComponent.Button name="sign up" />
                    </FormComponent.Content>
                </FormComponent.Root>
                <div className="text-neutral-300 text-sm gap-2 w-full max-w-96 flex items-center justify-center fixed bottom-20">
                    <p className="first-letter:capitalize">
                        return for <a href="http://localhost:3000" className="text-blue-400">sign in</a>
                    </p>
                </div>
            </section>
        </>
    )
}
