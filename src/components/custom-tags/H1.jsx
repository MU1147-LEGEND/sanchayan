const H1 = ({ children, className }) => {
    return (
        <h1
            className={`text-3xl md:text-4xl text-center font-bold text-green-900 mb-4 ${className}`}
        >
            {children}
        </h1>
    );
};
export default H1;
