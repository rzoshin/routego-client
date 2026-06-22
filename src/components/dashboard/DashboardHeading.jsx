const DashboardHeading = ({ title, description }) => {
    return (
        <div className="border-b border-border pb-5 w-full">
            <h1 className="text-3xl font-extrabold">
                {title}
            </h1>
            <p>
                {description}
            </p>
        </div>
    );
};

export default DashboardHeading;