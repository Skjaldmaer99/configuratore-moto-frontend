import Menu from "@/components/Menu"
import StepperForm from "@/components/StepperForm"

const DashboardPage = () => {
    return (
        <div className="max-h-screen">
            <div className="w-full flex gap-8">
                <div className="w-1/2 my-auto">
                    <Menu />
                </div>
                <div className="w-1/2">
                    <img src="public/aprilia.jpg" className="w-full" />
                </div>
            </div>
            <div className="bg-black/90">
                <StepperForm />
            </div>
        </div>
    )
}

export default DashboardPage
