const Contact = () => {
    return (
        <>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-center my-8">যোগাযোগ</h1>
                <p className="text-lg text-gray-700 mb-4">
                    আমাদের সাথে যোগাযোগ করতে চাইলে, অনুগ্রহ করে নিচের তথ্যগুলো
                    ব্যবহার করুন:
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    ইমেইল:{" "}
                    <a
                        href="mailto:contact@sanchayanbd.com"
                        className="text-blue-600 hover:underline"
                    >
                        {" "}
                        contact@sanchayanbd.com{" "}
                    </a>
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    ফোন:{" "}
                    <a
                        href="tel:+8801234567890"
                        className="text-blue-600 hover:underline"
                    >
                        +8801234567890
                    </a>
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    ঠিকানা: আখাউড়া, ব্রাহ্মণবাড়িয়া, বাংলাদেশ।
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    আমাদের অফিসের সময়: শনিবার থেকে বৃহস্পতিবার, সকাল ৯টা থেকে
                    বিকাল ৫টা পর্যন্ত।
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    আপনার যেকোনো প্রশ্ন বা পরামর্শ থাকলে, আমাদের সাথে যোগাযোগ
                    করতে দ্বিধা করবেন না। আমরা আপনাকে সাহায্য করতে প্রস্তুত আছি।
                </p>
                <p className="text-lg text-gray-700 mb-4">ধন্যবাদ!</p>
            </div>
        </>
    );
};
export default Contact;
