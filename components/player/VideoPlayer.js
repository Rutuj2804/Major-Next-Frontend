import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import {
	FullscreenRounded,
	PauseRounded,
	PictureInPictureAltRounded,
	PlayArrowRounded,
	SkipNextRounded,
	SkipPreviousRounded,
	SlowMotionVideoRounded,
	VolumeMuteRounded,
	VolumeUpRounded,
} from "@mui/icons-material";

const VideoPlayer = ({src , children}) => {
	const [isPaused, setIsPaused] = useState(false);
	const [isMute, setIsMute] = useState(false);
	const [progressBar, setProgressBar] = useState("0");
	const [progressTime, setProgressTime] = useState("00:00");
	const [progressTimePosition, setProgressTimePosition] = useState("0");
	const [playBackSpeedMenu, setPlayBackSpeedMenu] = useState(false);
	const [playBackSpeedRate, setPlayBackSpeedRate] = useState(1);
	const [timeElapsedInVideo, setTimeElapsedInVideo] = useState("00:00");
	const [videoDuration, setVideoDuration] = useState("00:00");
	const [hideControls, setHideControls] = useState(false);

	const videoRef = useRef();
	const videoPlayer = useRef();
	const videoTimeLine = useRef();
	const inputRef = useRef();
	const sectionRef = useRef(null);

    useEffect(()=>{
        videoRef.current.play()
        setIsPaused(false)
    }, [videoRef.current])

	useEffect(() => {
		let timer;

		const hideAndShowControls = () => {
			if (videoRef.current?.paused) return;
			timer = setTimeout(() => setHideControls(true), 3000);
		};
		hideAndShowControls();
		videoPlayer.current.addEventListener("mousemove", () => {
			setHideControls(false);
			clearTimeout(timer);
			hideAndShowControls();
		});
	}, []);

	const playPauseVideoState = () => {
		if (!videoRef.current?.paused) {
			videoRef.current.pause();
			setIsPaused(true);
		} else {
			videoRef.current.play();
			setIsPaused(false);
		}
	};

	const formatTime = (time) => {
		let seconds = Math.floor(time % 60),
			minutes = Math.floor(time / 60) % 60,
			hours = Math.floor(time / 360);

		seconds = seconds < 10 ? `0${seconds}` : seconds;
		minutes = minutes < 10 ? `0${minutes}` : minutes;
		hours = hours < 10 ? `0${hours}` : hours;

		if (hours == 0) return `${minutes}:${seconds}`;
		return `${hours}:${minutes}:${seconds}`;
	};

	useEffect(() => {
		const timeupdateFunction = (e) => {
			let { currentTime, duration } = e.target;
			let percent = (currentTime / duration) * 100;
			setProgressBar(`${percent}%`);
			setTimeElapsedInVideo(formatTime(currentTime));
			setVideoDuration(formatTime(duration));
		};

		videoRef.current.addEventListener("timeupdate", timeupdateFunction);
	}, []);

	useEffect(() => {
		videoTimeLine.current.addEventListener("mousemove", (e) => {
			let offset = e.offsetX;
			setProgressTimePosition(`${offset}px`);

			let timelineWidth = videoTimeLine.current.clientWidth;
			let percent =
				(e.offsetX / timelineWidth) * videoRef.current.duration;
			setProgressTime(formatTime(percent));
		});
	}, []);

	useEffect(() => {
		const dragFunction = (e) => {
			let timelineWidth = videoTimeLine.current.clientWidth;
			setProgressBar(`${e.offsetX}px`);
			videoRef.current.currentTime =
				(e.offsetX / timelineWidth) * videoRef.current.duration;
		};

		videoTimeLine.current.addEventListener("mousedown", () => {
			videoTimeLine.current.addEventListener("mousemove", dragFunction);
		});

		sectionRef.current.addEventListener("mouseup", () => {
			videoTimeLine.current.removeEventListener(
				"mousemove",
				dragFunction
			);
		});
	}, []);

	useEffect(() => {
		// document.addEventListener("click", e=>{
		// 	if(e.target.className !== "playback__speed") {
		// 		console.log(e.target.classList);
		// 		setPlayBackSpeedMenu(false)
		// 	}
		// })
	}, []);

	const skipVideoLength = (v) => {
		videoRef.current.currentTime += v;
	};

	const muteAndSound = () => {
		if (isMute) {
			videoRef.current.volume = 0.5;
			setIsMute(false);
		} else {
			videoRef.current.volume = 0;
			setIsMute(true);
		}
	};

	const onVolumeChange = (e) => {
		videoRef.current.volume = e.target.value;

		if (e.target.value == 0) setIsMute(true);
		else setIsMute(false);

		inputRef.current.value = e.target.value;
	};

	const handlePlayBackRate = (v) => {
		videoRef.current.playbackRate = v;
		setPlayBackSpeedRate(v);
	};

	const fullScreenMode = () => {
		console.log(document.fullscreenElement);
		if (document.fullscreenElement) {
			return document.exitFullscreen();
		}
		sectionRef.current.requestFullscreen();
	};

	const updateVideoLength = (e) => {
		let timelineWidth = e.target.clientWidth;
		videoRef.current.currentTime =
			(e.nativeEvent.offsetX / timelineWidth) * videoRef.current.duration;
	};

	return (
		<section className="container" ref={sectionRef}>
			<div
				className={
					hideControls
						? "video__player"
						: "video__player show__controls"
				}
				ref={videoPlayer}
			>
				<div className="controls">
					<div
						className="video__timeline"
						onClick={(e) => updateVideoLength(e)}
						ref={videoTimeLine}
					>
						<div className="video__progress">
							<span style={{ left: `${progressTimePosition}` }}>
								{progressTime}
							</span>
							<div
								className="progress__bar"
								style={{ width: `${progressBar}` }}
							></div>
						</div>
					</div>
					<ul className="video__controls">
						<li className="options left">
							<button
								size="small"
								className="volume"
								onClick={muteAndSound}
							>
								{isMute ? (
									<VolumeMuteRounded />
								) : (
									<VolumeUpRounded />
								)}
							</button>
							<input
								type="range"
								min={0}
								max={1}
								step="any"
								onInput={onVolumeChange}
								ref={inputRef}
							/>
							<div className="video__timer">
								<p className="current__time">
									{timeElapsedInVideo}
								</p>
								<p className="separator">/</p>
								<p className="video__duration">
									{videoDuration}
								</p>
							</div>
						</li>
						<li className="options center">
							<button
								className="skip__backward"
								size="small"
								onClick={() => skipVideoLength(-5)}
							>
								<SkipPreviousRounded />
							</button>
							<button
								className="play__pause"
								size="small"
								onClick={() => playPauseVideoState()}
							>
								{!isPaused ? (
									<PauseRounded />
								) : (
									<PlayArrowRounded />
								)}
							</button>
							<button
								className="skip__forward"
								size="small"
								onClick={() => skipVideoLength(5)}
							>
								<SkipNextRounded />
							</button>
						</li>
						<li className="options right">
							<div className="playback__content">
								<button
									className={
										playBackSpeedMenu
											? "playback__speed show"
											: "playback__speed"
									}
									size="small"
									onClick={() =>
										setPlayBackSpeedMenu((v) => !v)
									}
								>
									<SlowMotionVideoRounded className="playback__speed" />
								</button>
								<div className="speed__options">
									<div
										onClick={() => handlePlayBackRate(2)}
										className={
											playBackSpeedRate == 2
												? "active"
												: ""
										}
									>
										2x
									</div>
									<div
										onClick={() => handlePlayBackRate(1.5)}
										className={
											playBackSpeedRate == 1.5
												? "active"
												: ""
										}
									>
										1.5x
									</div>
									<div
										onClick={() => handlePlayBackRate(1)}
										className={
											playBackSpeedRate == 1
												? "active"
												: ""
										}
									>
										Normal
									</div>
									<div
										onClick={() => handlePlayBackRate(0.75)}
										className={
											playBackSpeedRate == 0.75
												? "active"
												: ""
										}
									>
										0.75x
									</div>
									<div
										onClick={() => handlePlayBackRate(0.5)}
										className={
											playBackSpeedRate == 0.5
												? "active"
												: ""
										}
									>
										0.5x
									</div>
								</div>
							</div>
							<button
								className="picture__in__picture"
								size="small"
								onClick={() =>
									videoRef.current.requestPictureInPicture()
								}
							>
								<PictureInPictureAltRounded />
							</button>
							<button
								className="skip__forward"
								size="small"
								onClick={fullScreenMode}
							>
								<FullscreenRounded />
							</button>
						</li>
					</ul>
				</div>
				<video
					src={
						src || "https://static.videezy.com/system/resources/previews/000/021/517/original/Flying-Over-A-Beach-4K.mp4"
					}
					autoPlay={true}
					alt="lesson"
					ref={videoRef}
				></video>
			</div>
			{children}
		</section>
	);
};

export default VideoPlayer;
