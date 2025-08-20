import Events from "@/components/Events";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              All Events
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover our upcoming events designed to help you build income streams while traveling the world.
            </p>
          </div>
          <Events />
        </div>
      </div>
    </div>
  );
}
