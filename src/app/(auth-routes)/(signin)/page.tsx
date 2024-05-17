"use client"

import { methods } from "@/utils/methods";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { FormComponent } from "@/components/FormComponent/Form";
import { Http } from "@/app/config/axiosConfig";
import { ISignin } from "@/types/ISignin";
import Icon from "@/utils/icons"
import cookie from "js-cookie"



export default function Signin() {

  const [credential, setCredential] = useState({ nickname: "", password: "" })
  const router = useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!methods.handleVerifyNickname(credential.nickname) || !methods.handleVerifyPassword(credential.password)) return

    const result = await signIn('credentials', {
      nickname: credential.nickname,
      password: credential.password,
      redirect: false
    })

    const signin = await Http.post<ISignin>("/login", {
      nickname: credential.nickname,
      password: credential.password
    }).then(res => res.data)

    cookie.set("token", signin.token)
    cookie.set("nickname", credential.nickname)
    cookie.set("password", credential.password)

    if (result?.error) {
      console.log(result)
      return
    }

    router.replace("/upload")

  }

  const handleName = (e: ChangeEvent<HTMLInputElement>) =>  setCredential({ ...credential, nickname: e.target.value })

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setCredential({ ...credential, password: e.target.value })

  return (

    <>
      <section className="bg-zinc-900
      grid
      place-items-center
      h-screen
      w-full
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
                  autoComplete="off"
                  placeholder="your nickname"
                  value={credential.nickname}
                  onChange={handleName}
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
                  bg-transparent
                  w-full
                  p-1
                  outline-none
                  text-neutral-100
                  placeholder:text-sm
                  "
                />
                <Icon.BsKey size={25} style={{ color: "#fff" }} />;

              </label>
            </fieldset>
            <FormComponent.Button name="sign in" />
          </FormComponent.Content>
        </FormComponent.Root>
        <div className="text-neutral-300 text-sm gap-2 w-full max-w-96 flex items-center justify-center fixed bottom-28">
          <p className="first-letter:capitalize">
            forgot your <a href="http://localhost:3000/forgot" className="text-blue-400">password</a>
          </p>/
          <p className="first-letter:capitaliz">
            create an <a href="http://localhost:3000/signup" className="text-blue-400">account</a>
          </p>
        </div>
      </section>
    </>
  );
}