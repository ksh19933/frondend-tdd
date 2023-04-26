import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import Week1 from "@/pages/week1/week1";

describe('week1 jest test', () => {
  it('renders a component', () => {
      const renderedComponent = render(<Week1 />)
      expect(renderedComponent).toBeDefined()
  })
  it('contaniner check', () => {
      const renderedComponent = render(<Week1 />)
      const week1Div = screen.getByTestId('week1')
      expect(week1Div).toBeInTheDocument()
  })
})
