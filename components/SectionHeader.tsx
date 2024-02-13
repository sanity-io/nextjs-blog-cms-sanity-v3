interface SectionHeaderProps {
  header?: string
  description?: string
}
export const SectionHeader = ({ header, description }: SectionHeaderProps) => {
  return (
    <div className="flex flex-row justify-between gap-2 min-h-2 w-full mb-4">
      <div>
        <h2 className="text-lg font-bold">{header}</h2>
      </div>
      <div className="text-xs">{description}</div>
    </div>
  )
}
