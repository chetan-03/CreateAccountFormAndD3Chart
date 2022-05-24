import { useState } from "react";
import "../App.css";
import FormInput from "./FormInput";
import bg from "../img/bg.jpeg";
import { useNavigate } from 'react-router-dom'
const CreateForm = () => {
	// using useNavigate hook for redirecting the page
	let navigate = useNavigate();
	// setting up credentials state for storing all form data
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
		cpassword: "",
		fname: "",
		pnumber: "",
		agree: false,
	});
	// setting up errors state for storing all form errors messages
	const [errors, setErrors] = useState({
		email: "",
		password: "",
		cpassword: "",
		pnumber: "",
	});
	// validating email in format like abc@xyz.com note .com can be .in or .sies or anything
	const validateEmail = (email) => {
		return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		);
	};
	// validating password to match pattern i.e atleast 1 Uppercase, 1 Lowercase, 1 special charecter and number and It should be 8 length long password
	const validatePassword = (pwd) => {
		return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/.test(
			pwd
		);
	};
	// validating phone no i.e. it should be number and 10 digits long
	const validatePhoneNo = (no) => {
		return /^\d{10}$/.test(no);
	};
	// validating whole form details and setting up relevant errors messages in errors state
	const formValidation = (input) => {
		// selecting input element for error styling i.e. x(cross) sign
		const tooltip = document.getElementsByClassName("main__form_input_status")

		switch (input.name) {
			case "email":
				if (input.value.length !== 0) {
					tooltip[0].classList.add('show')
					validateEmail(input.value)
						? setErrors({ ...errors, [input.name]: "" })
						: setErrors({
							...errors,
							[input.name]: "enter valid email address!",
						});
				} else {
					setErrors({
						...errors,
						[input.name]: "Please enter your email address",
					});
				}
				break;
			case "password":
				if (input.value) {
					tooltip[1].classList.add('show')
					validatePassword(input.value)
						? setErrors({ ...errors, [input.name]: "" })
						: setErrors({
							...errors,
							[input.name]:
								"password must contain atleast one uppercase letter,one lowercase letter, one special charecter and must be 8 lenght long!",
						});
				} else {
					setErrors({ ...errors, [input.name]: "Please enter password" });
				}
				break;
			case "cpassword":
				tooltip[2].classList.add('show')
				input.value === credentials["password"]
					? setErrors({ ...errors, [input.name]: "" })
					: setErrors({
						...errors,
						[input.name]: "confirm password must be same as password ",
					});
				break;
			case "pnumber":
				tooltip[4].classList.add('show')
				validatePhoneNo(input.value)
					? setErrors({ ...errors, [input.name]: "" })
					: setErrors({
						...errors,
						[input.name]: "Enter valid phone number!",
					});
				break;

			default:
				setErrors({ ...errors });
		}
	};
	// updating credentails state and validating form when input changes
	const onChange = (e) => {
		if (e.target.name === 'agree') {
			setCredentials({ ...credentials, [e.target.name]: [e.target.checked] })
		} else {
			setCredentials({ ...credentials, [e.target.name]: e.target.value });
		}
		formValidation(e.target);
		console.log(errors)
	};
	// onCreateAcc function is called when form is submitted
	const onCreateAcc = (e) => {
		// prevents the page reload
		e.preventDefault();
		//  checking whether errors are there in errors state
		const isValidForm = Object.values(errors).every((e) => e === "")
		// checking all required inputs i.e email,password,cpassword and phone number are entered
		if (e.target[0].value && e.target[1].value && e.target[2].value && e.target[4].value)
			// navigating page to route /d3 if form is valid or error free
			isValidForm && navigate('/d3', { replace: true })
	};
	return (
		<>
			<main className='main flex'>
				<div className='main__bg'>
					<img
						src={ bg }
						alt='oops diagram not found!'
						className='main__bg-img'
					/>
					<div className='main__bg_desc'>
						<div className='main__bg_desc-title'>Choose a data range</div>
						<span className='main__bg_desc-txt'>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
							rerum ut aliquam at, nulla laudantium ipsam.
						</span>
					</div>
				</div>
				<form onSubmit={ (e) => onCreateAcc(e) } className='main__form'>
					<div className='main__form_title'>Create an account</div>
					<label htmlFor='email'>Your email address</label>
					<br />
					<FormInput
						type='text'
						onChange={ (e) => onChange(e) }
						errors={ errors.email }
						credentials={ credentials.email }
						name='email'
					/>
					<br />
					<label htmlFor='password'>Your password</label>
					<br />
					<FormInput
						type='password'
						onChange={ (e) => onChange(e) }
						errors={ errors.password }
						credentials={ credentials.password }
						name='password'
					/>
					<br />
					<label htmlFor='conpass'>Confirm your password</label>
					<br />
					<FormInput
						type='password'
						onChange={ (e) => onChange(e) }
						errors={ errors.cpassword }
						credentials={ credentials.cpassword }
						name='cpassword'
					/>
					<br />
					<label htmlFor='fname'>Your full name</label>
					<br />
					<FormInput
						type='text'
						onChange={ (e) => onChange(e) }
						errors={ errors.fname }
						credentials={ credentials.fname }
						name='fname'
					/>
					<br />
					<label htmlFor='pnum'>Your phone number</label>
					<br />
					<FormInput
						type='text'
						onChange={ (e) => onChange(e) }
						errors={ errors.pnumber }
						credentials={ credentials.pnumber }
						name='pnumber'
					/>
					<br />

					<label className='main__form_check-box_label' htmlFor='iAgree'>
						i read and agree Terms and Conditions
						<input
							name='agree'
							checked={ credentials.agree }
							onChange={ (e) => onChange(e) }
							className={ `main__form_check-box` }
							type='checkbox'
							id='iAgree'
						/>
						<span className={ `checkmark` }></span>
					</label>
					<br />
					<button type="submit" className='btn main__form_submit'>Create account</button>
					<br />
				</form>
			</main>
		</>
	);
}

export default CreateForm;
