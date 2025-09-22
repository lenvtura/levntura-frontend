import { Metadata } from "next";
import { Address } from "./address";
// import { JoinOurComunity } from './join-our-comunity';
import { SocialAndForm } from "./social-and-form";

export const metadata: Metadata = {
  title: "Contact us | Levntura",
};

export default function ContactPage() {
  return (
    <>
      <SocialAndForm />
      <Address />
      {/* <JoinOurComunity /> */}
    </>
  );
}
