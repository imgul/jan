import { useMemo } from 'react'

import { ScrollArea } from '@janhq/uikit'
import { useAtomValue } from 'jotai'

import ModelDownloadRow from '../ModelDownloadRow'

import { importingHuggingFaceRepoDataAtom } from '@/helpers/atoms/HuggingFace.atom'

const ModelDownloadList: React.FC = () => {
  const importingHuggingFaceRepoData = useAtomValue(
    importingHuggingFaceRepoDataAtom
  )

  const ggufModels = useMemo(
    () =>
      importingHuggingFaceRepoData?.siblings.filter(
        (e) => e.downloadUrl && e.rfilename.endsWith('.gguf')
      ),
    [importingHuggingFaceRepoData]
  )

  if (!importingHuggingFaceRepoData) return null

  if (!ggufModels || ggufModels.length === 0) {
    return <div>No available GGUF model</div> // TODO: better wording for this
  }

  return (
    <div className="flex h-[500px] flex-1 flex-col">
      <h1 className="mb-3 text-sm font-semibold">Available Versions</h1>
      <ScrollArea className="flex-1">
        {ggufModels.map((model, index) => (
          <ModelDownloadRow
            repoData={importingHuggingFaceRepoData}
            downloadUrl={model.downloadUrl!}
            key={model.rfilename}
            index={index}
            fileName={model.rfilename}
            fileSize={model.fileSize}
            quantization={model.quantization}
          />
        ))}
      </ScrollArea>
    </div>
  )
}

export default ModelDownloadList
