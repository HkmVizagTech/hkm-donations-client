import { org } from '../content/orgContent'

export function Footer() {
  return (
    <footer className="border-t border-sun-400/20 bg-gradient-to-b from-sky-900 to-sky-950 text-cream-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <img src="/logo.png" alt="ISKCON Gambheeram" className="h-12 w-auto rounded-lg bg-white/95 px-2 py-1" />
          <h3 className="mt-3 font-serif text-lg font-semibold text-cream-50">{org.brandName}</h3>
          <p className="mt-2 text-sm text-cream-200/70">{org.address}</p>
          <div className="mt-4 flex gap-3 text-sm">
            <a href={org.social.facebook} target="_blank" rel="noreferrer" className="text-cream-200/70 hover:text-sun-300">Facebook</a>
            <a href={org.social.instagram} target="_blank" rel="noreferrer" className="text-cream-200/70 hover:text-sun-300">Instagram</a>
            <a href={org.social.youtube} target="_blank" rel="noreferrer" className="text-cream-200/70 hover:text-sun-300">YouTube</a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-sun-300">Daily Schedule</h4>
          <ul className="mt-3 space-y-1.5 text-sm text-cream-200/70">
            {org.dailySchedule.map((s) => (
              <li key={s.name} className="flex justify-between gap-3">
                <span>{s.name}</span>
                <span className="text-cream-200/50">{s.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-sun-300">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-cream-200/70">
            <li><a href="#sevas" className="hover:text-sun-200">Sevas</a></li>
            <li><a href="#festivals" className="hover:text-sun-200">Festivals</a></li>
            <li><a href="#special-occasion" className="hover:text-sun-200">Special Occasion</a></li>
            <li><a href="#trust" className="hover:text-sun-200">Trust &amp; Transparency</a></li>
            <li><a href="#contact" className="hover:text-sun-200">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-sun-300">Get in Touch</h4>
          <ul className="mt-3 space-y-2 text-sm text-cream-200/70">
            <li><a href={org.contact.phoneHref} className="hover:text-sun-200">{org.contact.phone}</a></li>
            <li><a href={`mailto:${org.contact.email}`} className="hover:text-sun-200">{org.contact.email}</a></li>
            <li className="pt-1 text-cream-200/50">Morning: {org.temple.morningHours}</li>
            <li className="text-cream-200/50">Evening: {org.temple.eveningHours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream-100/10 py-4 text-center text-xs text-cream-200/50">
        &copy; {new Date().getFullYear()} {org.legalName}, Visakhapatnam. Made with devotion.
      </div>
    </footer>
  )
}
