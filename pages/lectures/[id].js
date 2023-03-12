import Head from "next/head";
import React from "react";
import VideoPlayer from "../../components/player/VideoPlayer";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { FaDiscord } from "react-icons/fa";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get_single_lecture } from "../../store/lecture";
import { useRouter } from "next/router";

const lessonsData = [
	{
		name: "Introduction",
		text: `Until now, we've been learning Three.js to create web applications in pure JS. However, sometimes we need to integrate Three.js into very specific environments like, let's say, a framework.
		One of the most popular frameworks these days is React and we are going to learn how to integrate Three.js into it.		
		While it might be considered a constraint, React actually makes the process of creating Three.js applications much easier.		
		And if you don't know React and you are thinking about leaving, don't worry, we are going to learn it together in the next lesson.`,
	},
	{
		name: "React ",
		text: `As we mentioned earlier, React is a framework, but following the official website, React is actually a library whose purpose is to create user interfaces.

		The idea is to write code in JSX (a tag-based language very similar to HTML), after which it gets compiled into a website with the usual content such as a header, a footer, some texts, lists, etc.
		
		“Not very different from writing HTML, you might think.
		
		Here's the catch: when the data changes, the UI will change automatically without you doing anything. In other words, the UI will “react” to the data. We also call that phenomenon “data-binding”.
		
		On top of that, React also integrates many tools that will make a developer's life easier. Besides easily applying structure, you will also be able to hook parts of your app together and be notified when something changes.
		
		React is great because it not only allows you to create websites where the displayed data changes frequently, but it also benefits from the many tools and its inherent structure. This is why we also talk about React as a framework.
		
		Also note that, although we've been talking about React as a way of building websites (since Three.js is for the web), React can be used to build a lot more.
		
		There are some alternatives like Vue.js and Svelte, but those are less popular and Three.js doesn't integrate as well with those alternatives as it does with React.
		
		These days, React is so popular that it's a must-have in your toolset, especially if you are looking for a job or to integrate with teams.`,
	},
	{
		name: "Drawbacks ",
		text: `Sounds awesome, right? Well, I should point out that there are a few drawbacks to consider:

		You need to learn it. Though it sounds obvious, React is quite a complex library and it takes time to learn it.
		It's still under development. React is very stable and shouldn't change that much. Still, it is prone to changes (like any maintained library). Keeping an eye on potential changes is crucial.
		If your app breaks down, debugging might get harder because of the complexity and the abstraction.`,
	},
];

const LectureSingle = () => {

    const lecture = useSelector(state=>state.lecture.lecture)

    const dispatch = useDispatch()

    const router = useRouter()

    const id = router.query.id

    useEffect(()=>{
        dispatch(get_single_lecture({ id }))
    }, [id])
console.log(lecture.file);
	return (
		<div className="watch__ContainerWrapper">
			<Head>
				<title>{lecture.title}</title>
			</Head>
			<main>
				<VideoPlayer src={`${process.env.NEXT_PUBLIC_API_URL}/${lecture.file}`}>
					<div className="container">
						<div className="title__and__description">
							<div className="row">
								<div className="col-lg-6 col-md-8 col-12">
									<p>03.</p>
									<h4>
										{lecture.title}
									</h4>
									<h6>
										Subject <span>{lecture.subjectID.name}</span>
									</h6>
								</div>
							</div>
						</div>
                        <div className="lessons__data">
                            <h4>Description</h4>
                            <p>{lecture.description}</p>
                        </div>
						<div className="next__prev">
							<Button
								startIcon={<MdKeyboardArrowLeft />}
							>
								Prev Lesson
							</Button>
							<Button endIcon={<MdKeyboardArrowRight />}>
								Next Lesson
							</Button>
						</div>
					</div>
				</VideoPlayer>
			</main>
		</div>
	);
};

export default LectureSingle;
