import { Result } from '@standardnotes/domain-core'

import { GetHost } from '../..'
import { IsApplicationUsingThirdPartyHost } from './IsApplicationUsingThirdPartyHost'

describe('IsApplicationUsingThirdPartyHost', () => {
  let getHostUseCase: GetHost

  const createUseCase = () => new IsApplicationUsingThirdPartyHost(getHostUseCase)

  beforeEach(() => {
    getHostUseCase = {} as jest.Mocked<GetHost>
    getHostUseCase.execute = jest.fn().mockReturnValue(Result.ok('https://api-note.2kvn.com'))
  })

  it('returns true if host is localhost', () => {
    getHostUseCase.execute = jest.fn().mockReturnValue(Result.ok('http://localhost:3000'))

    const useCase = createUseCase()
    const result = useCase.execute()

    expect(result.getValue()).toBe(true)
  })

  it('returns false if host is api-note.2kvn.com', () => {
    getHostUseCase.execute = jest.fn().mockReturnValue(Result.ok('https://api-note.2kvn.com'))

    const useCase = createUseCase()
    const result = useCase.execute()

    expect(result.getValue()).toBe(false)
  })

  it('returns false if host is sync.standardnotes.org', () => {
    getHostUseCase.execute = jest.fn().mockReturnValue(Result.ok('https://sync.standardnotes.org'))

    const useCase = createUseCase()
    const result = useCase.execute()

    expect(result.getValue()).toBe(false)
  })

  it('returns false if host is file-note.2kvn.com', () => {
    getHostUseCase.execute = jest.fn().mockReturnValue(Result.ok('https://file-note.2kvn.com'))

    const useCase = createUseCase()
    const result = useCase.execute()

    expect(result.getValue()).toBe(false)
  })

  it('returns true if host is not first party', () => {
    getHostUseCase.execute = jest.fn().mockReturnValue(Result.ok('https://example.com'))

    const useCase = createUseCase()
    const result = useCase.execute()

    expect(result.getValue()).toBe(true)
  })
})
