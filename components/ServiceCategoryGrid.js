import Link from "next/link";
import { s } from "@/lib/icons";
import { serviceCategories } from "@/lib/siteData";

export default function ServiceCategoryGrid() {
  return (
    <div className="ax-service-cols" style={s("display:grid; grid-template-columns:repeat(3,1fr); gap:32px;")}>
      {serviceCategories.map((cat) => (
        <div key={cat.name} data-reveal="">
          <div
            style={s(
              "font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--gold); margin-bottom:16px;"
            )}
          >
            {cat.name}
          </div>
          <div style={s("display:flex; flex-direction:column; gap:4px;")}>
            {cat.services.map((sv) => (
              <Link
                key={sv.slug}
                href={`/services/${sv.slug}`}
                className="ax-service-row"
                style={s("display:flex; align-items:flex-start; gap:14px; padding:12px; border-radius:14px;")}
              >
                <div
                  style={s(
                    "width:40px; height:40px; flex-shrink:0; border-radius:11px; background:var(--goldsoft); border:1px solid var(--border2); color:var(--gold); display:flex; align-items:center; justify-content:center;"
                  )}
                >
                  {sv.icon}
                </div>
                <div>
                  <div style={s("font-size:15.5px; font-weight:700; color:var(--head);")}>{sv.name}</div>
                  <div style={s("font-size:13px; color:var(--muted); margin-top:2px;")}>{sv.blurb}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
