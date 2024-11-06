import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import "./style.css";

interface ToastProps {
	title: string;
	description: string;
	actionLabel?: string;
	onActionClick?: () => void;
}

const ToastDemo: React.FC<ToastProps> = ({
	title,
	description,
	actionLabel = "Close",
	onActionClick,
}) => {
	const [open, setOpen] = React.useState(false);
	const timerRef = React.useRef(0);

	React.useEffect(() => {
		return () => clearTimeout(timerRef.current);
	}, []);

	const showToast = () => {
		setOpen(false);
		window.clearTimeout(timerRef.current);
		timerRef.current = window.setTimeout(() => {
			setOpen(true);
		}, 100);
	};

	return (
		<Toast.Provider swipeDirection="right">
			<button className="Button large violet" onClick={showToast}>
				Show Toast
			</button>

			<Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
				<Toast.Title className="ToastTitle">{title}</Toast.Title>
				<Toast.Description className="ToastDescription">
					{description}
				</Toast.Description>
				{onActionClick && (
					<Toast.Action
						className="ToastAction"
						asChild
						altText="Goto schedule to undo"
					>
						<button className="Button small green" onClick={onActionClick}>
							{actionLabel}
						</button>
					</Toast.Action>
				)}
			</Toast.Root>
			<Toast.Viewport className="ToastViewport" />
		</Toast.Provider>
	);
};

export default ToastDemo;
